use actix_web::{get, web, App, HttpResponse, HttpServer, Result};

use hora::core::ann_index::ANNIndex;

use rand::{thread_rng, Rng};
use serde::{Deserialize, Serialize};

use std::collections::HashMap;

use embedding::embeder_client::EmbederClient;
use embedding::EmbedRequest;
use std::collections::HashSet;
use std::fs::File;
use std::io::Read;
#[macro_use]
extern crate lazy_static;

pub mod embedding {
    tonic::include_proto!("embedding");
}

static WINE: &str = "wine";
static CELEBRITY: &str = "celebrity";
static DEMO_PREFIX: &str = "/demos/public/";

lazy_static! {
    static ref SERVING_DATA: web::Data<ServingData> = prepare_data();
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct WineReviewsSearchItem {
    embedding: Vec<f32>,
    id: String,
    country: String,
    description: String,
    designation: String,
    province: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct WineReviewsSearchResp {
    resp: Vec<WineReviewsSearchItem>,
}

#[derive(Serialize, Deserialize, Debug)]
struct PicSearchItem {
    pic_name: String,
    #[serde(default)]
    pic_url: String,
    embedding: Vec<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
struct PicSearchResp {
    resp: Vec<PicSearchItem>,
}

#[derive(Deserialize)]
struct SearchQuery {
    query: String,
}

#[derive(Deserialize)]
struct SearchWine {
    description: String,
}

#[derive(Clone, Debug)]
struct PicItem {
    pic_name: String,
    pic_url: String,
    embedding: Vec<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
struct WineReviewsItem {
    id: String,
    country: String,
    description: String,
    designation: String,
    province: String,
    embedding: String,
}

struct ServingData {
    indices: HashMap<String, Box<hora::index::hnsw_idx::HNSWIndex<f32, String>>>,

    wine_reviews_data: HashMap<String, WineReviewsSearchItem>,
    wine_reviews_key_list: Vec<String>,
    celebrity_data: HashMap<String, PicItem>,
    celebrity_key_list: Vec<String>,
    cats_data: HashMap<String, PicItem>,
    cats_key_list: Vec<String>,

    rt: tokio::runtime::Runtime,
}

fn prepare_data() -> web::Data<ServingData> {
    println!("start preparing data");
    let mut indices: HashMap<String, Box<hora::index::hnsw_idx::HNSWIndex<f32, String>>> =
        HashMap::new();
    indices.insert(
        CELEBRITY.to_string(),
        Box::new(hora::index::hnsw_idx::HNSWIndex::<f32, String>::new(
            128,
            &hora::index::hnsw_params::HNSWParams::<f32>::default(),
        )),
    );

    indices.insert(
        WINE.to_string(),
        Box::new(hora::index::hnsw_idx::HNSWIndex::<f32, String>::new(
            768,
            &hora::index::hnsw_params::HNSWParams::<f32>::default(),
        )),
    );

    // celebrity
    let mut file = File::open("celebrity_emebeddings.json").unwrap();
    let mut data = String::new();
    file.read_to_string(&mut data).unwrap();

    let celebrity_info: Vec<PicSearchItem> =
        serde_json::from_str(&data).expect("JSON was not well-formatted");
    let mut celebrity_data = HashMap::new();
    let mut celebrity_key_list = Vec::new();

    celebrity_info.iter().for_each(|x| {
        celebrity_data.insert(
            x.pic_name.clone(),
            PicItem {
                pic_name: x.pic_name.clone(),
                pic_url: "".to_string(),
                embedding: x.embedding.clone(),
            },
        );
        celebrity_key_list.push(x.pic_name.clone());
        indices
            .get_mut(CELEBRITY)
            .unwrap()
            .add(&x.embedding, x.pic_name.clone())
            .unwrap();
    });
    println!("start build {:?} point", celebrity_key_list.len());
    indices
        .get_mut(CELEBRITY)
        .unwrap()
        .build(hora::core::metrics::Metric::Euclidean)
        .unwrap();

    // wine
    let filename = "demo.csv";
    let wine_file = File::open(filename).unwrap();
    let mut rdr = csv::Reader::from_reader(wine_file);
    let mut wine_reviews_key_list = Vec::new();
    let mut wine_data: HashMap<String, WineReviewsSearchItem> = HashMap::new();
    for result in rdr.deserialize() {
        let record: WineReviewsItem = result.unwrap();
        if record.embedding.is_empty() {
            continue;
        }
        let temp: Vec<f32> = serde_json::from_str(&record.embedding).unwrap();
        let id = record.id.clone();
        indices
            .get_mut(WINE)
            .unwrap()
            .add(&temp.clone(), id.clone())
            .unwrap();

        wine_data.insert(
            record.id.clone(),
            WineReviewsSearchItem {
                embedding: temp,
                id: record.id.clone(),
                country: record.country,
                description: record.description,
                designation: record.designation,
                province: record.province,
            },
        );
        wine_reviews_key_list.push(id);
    }
    println!("start build {:?} point", wine_reviews_key_list.len());

    indices
        .get_mut(WINE)
        .unwrap()
        .build(hora::core::metrics::Metric::Euclidean)
        .unwrap();

    println!("finish preparing");
    web::Data::new(ServingData {
        indices,
        wine_reviews_data: wine_data,
        wine_reviews_key_list,
        celebrity_data,
        celebrity_key_list,
        cats_data: HashMap::new(),
        cats_key_list: Vec::new(),
        rt: tokio::runtime::Runtime::new().unwrap(),
    })
}

#[get("/cat_search")]
async fn cat_search(query: web::Query<String>) -> Result<HttpResponse> {
    static K: usize = 5;
    match SERVING_DATA.cats_data.get(&query.clone()) {
        Some(item) => {
            let resp_list = SERVING_DATA
                .indices
                .get("cat")
                .unwrap()
                .search(&item.embedding, K)
                .iter()
                .map(|x| {
                    let cat_item = SERVING_DATA.cats_data.get(x).unwrap();
                    PicSearchItem {
                        pic_name: cat_item.pic_name.clone(),
                        pic_url: cat_item.pic_url.clone(),
                        embedding: cat_item.embedding.clone(),
                    }
                })
                .collect::<Vec<PicSearchItem>>();

            Ok(HttpResponse::Ok().json(PicSearchResp { resp: resp_list }))
        }
        None => Ok(HttpResponse::NotFound().finish()),
    }
}

#[get("/cat_random")]
async fn cat_random(data: web::Data<ServingData>) -> Result<HttpResponse> {
    static K: usize = 5;
    let mut rng = thread_rng();
    let resp_list = (0..K)
        .map(|_| {
            let n: usize = rng.gen_range(0..data.cats_key_list.len());
            let cat_item = SERVING_DATA.cats_data.get(&data.cats_key_list[n]).unwrap();
            PicSearchItem {
                pic_name: cat_item.pic_name.clone(),
                pic_url: cat_item.pic_url.clone(),
                embedding: cat_item.embedding.clone(),
            }
        })
        .collect::<Vec<PicSearchItem>>();
    Ok(HttpResponse::Ok().json(PicSearchResp { resp: resp_list }))
}

#[get("/celebrity_random")]
async fn celebrity_random() -> Result<HttpResponse> {
    static K: usize = 5;
    let mut rng = thread_rng();
    let resp_list = (0..K)
        .map(|_| {
            let n: usize = rng.gen_range(0..SERVING_DATA.celebrity_key_list.len());
            let celebrity_item = SERVING_DATA
                .celebrity_data
                .get(&SERVING_DATA.celebrity_key_list[n])
                .unwrap();
            PicSearchItem {
                pic_name: celebrity_item.pic_name.clone(),
                pic_url: DEMO_PREFIX.to_owned() + &celebrity_item.pic_name,
                embedding: celebrity_item.embedding.clone(),
            }
        })
        .collect::<Vec<PicSearchItem>>();
    Ok(HttpResponse::Ok().json(PicSearchResp { resp: resp_list }))
}

#[get("/celebrity_search")]
async fn celebrity_search(query: web::Query<SearchQuery>) -> Result<HttpResponse> {
    static K: usize = 5;
    match SERVING_DATA.celebrity_data.get(&query.query.clone()) {
        Some(item) => {
            let resp_list = SERVING_DATA
                .indices
                .get(CELEBRITY)
                .unwrap()
                .search(&item.embedding, K)
                .iter()
                .map(|x| {
                    let celebrity_item = SERVING_DATA.celebrity_data.get(x).unwrap();
                    PicSearchItem {
                        pic_name: celebrity_item.pic_name.clone(),
                        pic_url: DEMO_PREFIX.to_owned() + &celebrity_item.pic_name,
                        embedding: celebrity_item.embedding.clone(),
                    }
                })
                .collect::<Vec<PicSearchItem>>();

            Ok(HttpResponse::Ok().json(PicSearchResp { resp: resp_list }))
        }
        None => Ok(HttpResponse::NotFound().finish()),
    }
}

#[get("/wine_search")]
async fn wine_search(query: web::Query<SearchWine>) -> Result<HttpResponse> {
    static K: usize = 10;
    static FINAL_K: usize = 5;

    if query.description.is_empty() || query.description.len() > 150 {
        return Ok(HttpResponse::BadRequest().finish());
    }

    let resp_list = SERVING_DATA
        .indices
        .get(WINE)
        .unwrap()
        .search(&embed(&query.description, &SERVING_DATA.rt), K)
        .iter()
        .map(|x| {
            let wine_item = SERVING_DATA.wine_reviews_data.get(x).unwrap();
            wine_item.clone()
        })
        .collect::<Vec<WineReviewsSearchItem>>();

    let mut final_resp_list: Vec<WineReviewsSearchItem> = Vec::with_capacity(FINAL_K);
    let mut description_set: HashSet<String> = HashSet::new();
    resp_list.iter().for_each(|x| {
        if description_set.contains(&x.description) {
            return;
        }
        description_set.insert(x.description.clone());
        final_resp_list.push(x.clone());
    });
    if final_resp_list.len() > K {
        final_resp_list = final_resp_list[..K].to_vec();
    } else {
        final_resp_list = resp_list[..K].to_vec();
    }

    Ok(HttpResponse::Ok().json(WineReviewsSearchResp {
        resp: final_resp_list,
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(
            web::scope("/demos")
                // .service(cat_search)
                .service(celebrity_search)
                .service(celebrity_random)
                // .service(cat_random)
                .service(wine_search),
        )
    })
    .workers(2)
    .bind("0.0.0.0:8080")?
    .run()
    .await
}

async fn async_embed(description: &str) -> Vec<f32> {
    let mut embed_client = EmbederClient::connect("http://[::1]:50051").await.unwrap();
    let request = tonic::Request::new(EmbedRequest {
        value: description.to_string(),
    });
    let response = embed_client.embed(request).await.unwrap();

    response.into_inner().embedding
}

fn embed(description: &str, rt: &tokio::runtime::Runtime) -> Vec<f32> {
    rt.block_on(async_embed(description))
}
