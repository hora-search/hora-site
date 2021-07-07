use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder, Result};
use futures::future::{ready, Ready};
use hora;
use hora::core::ann_index::ANNIndex;
use rand::distributions::{Alphanumeric, Standard, Uniform};
use rand::{thread_rng, Rng};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs::File;
use std::io::Read;

#[derive(Serialize, Deserialize, Debug)]
struct WineReviewsSearchItem {
    embedding: Vec<f32>,
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

#[derive(Clone, Debug)]
struct PicItem {
    pic_name: String,
    pic_url: String,
    embedding: Vec<f32>,
}

struct WineReviewsItem {
    id: String,
    country: String,
    description: String,
    designation: String,
    province: String,
    embedding: Vec<f32>,
}

struct ServingData {
    indices: HashMap<String, Box<hora::index::hnsw_idx::HNSWIndex<f32, String>>>,

    wine_reviews_data: HashMap<String, WineReviewsItem>,
    wine_reviews_key_list: Vec<String>,
    celebrity_data: HashMap<String, PicItem>,
    celebrity_key_list: Vec<String>,
    cats_data: HashMap<String, PicItem>,
    cats_key_list: Vec<String>,
}

fn prepare_data() -> ServingData {
    let mut indices: HashMap<String, Box<hora::index::hnsw_idx::HNSWIndex<f32, String>>> =
        HashMap::new();
    indices.insert(
        "celebrity".to_string(),
        Box::new(hora::index::hnsw_idx::HNSWIndex::<f32, String>::new(
            786,
            &hora::index::hnsw_params::HNSWParams::<f32>::default(),
        )),
    );

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
            .get_mut("celebrity")
            .unwrap()
            .add(&x.embedding, x.pic_name.clone());
    });
    indices
        .get_mut("celebrity")
        .unwrap()
        .build(hora::core::metrics::Metric::Euclidean);

    println!("finish preparing");
    ServingData {
        indices: indices,
        wine_reviews_data: HashMap::new(),
        wine_reviews_key_list: Vec::new(),
        celebrity_data: celebrity_data,
        celebrity_key_list: celebrity_key_list.clone(),
        cats_data: HashMap::new(),
        cats_key_list: Vec::new(),
    }
}

#[get("/cat_search")]
async fn cat_search(
    query: web::Query<String>,
    data: web::Data<ServingData>,
) -> Result<HttpResponse> {
    static k: usize = 5;
    match data.cats_data.get(&query.clone()) {
        Some(item) => {
            let resp_list = data
                .indices
                .get("cat")
                .unwrap()
                .search(&item.embedding, k)
                .iter()
                .map(|x| {
                    let cat_item = data.cats_data.get(x).unwrap();
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
    static k: usize = 5;
    let mut rng = thread_rng();
    let resp_list = (0..k)
        .map(|_| {
            let n: usize = rng.gen_range(0..data.cats_key_list.len());
            let cat_item = data.cats_data.get(&data.cats_key_list[n]).unwrap();
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
async fn celebrity_random(data: web::Data<ServingData>) -> Result<HttpResponse> {
    static k: usize = 5;
    let mut rng = thread_rng();
    let resp_list = (0..k)
        .map(|_| {
            let n: usize = rng.gen_range(0..data.celebrity_key_list.len());
            let celebrity_item = data
                .celebrity_data
                .get(&data.celebrity_key_list[n])
                .unwrap();
            PicSearchItem {
                pic_name: celebrity_item.pic_name.clone(),
                pic_url: celebrity_item.pic_url.clone(),
                embedding: celebrity_item.embedding.clone(),
            }
        })
        .collect::<Vec<PicSearchItem>>();
    Ok(HttpResponse::Ok().json(PicSearchResp { resp: resp_list }))
}

#[get("/celebrity_search")]
async fn celebrity_search(
    query: web::Query<String>,
    data: web::Data<ServingData>,
) -> Result<HttpResponse> {
    static k: usize = 5;
    match data.celebrity_data.get(&query.clone()) {
        Some(item) => {
            let resp_list = data
                .indices
                .get("celebrity")
                .unwrap()
                .search(&item.embedding, k)
                .iter()
                .map(|x| {
                    let celebrity_item = data.celebrity_data.get(x).unwrap();
                    PicSearchItem {
                        pic_name: celebrity_item.pic_name.clone(),
                        pic_url: celebrity_item.pic_url.clone(),
                        embedding: celebrity_item.embedding.clone(),
                    }
                })
                .collect::<Vec<PicSearchItem>>();

            Ok(HttpResponse::Ok().json(PicSearchResp { resp: resp_list }))
        }
        None => Ok(HttpResponse::NotFound().finish()),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .data(prepare_data())
            .service(cat_search)
            .service(celebrity_search)
            .service(celebrity_random)
            .service(cat_random)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
