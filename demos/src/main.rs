use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder, Result};
use futures::future::{ready, Ready};
use hora;
use hora::core::ann_index::ANNIndex;
use rand::distributions::{Alphanumeric, Standard, Uniform};
use rand::{thread_rng, Rng};
use serde::Serialize;
use std::collections::HashMap;

#[derive(Serialize)]
struct WineReviewsSearchItem {
    embedding: Vec<f32>,
}

#[derive(Serialize)]
struct WineReviewsSearchResp {
    resp: Vec<WineReviewsSearchItem>,
}

#[derive(Serialize)]
struct PicSearchItem {
    pic_name: String,
    pic_url: String,
    embedding: Vec<f32>,
}

#[derive(Serialize)]
struct PicSearchResp {
    resp: Vec<PicSearchItem>,
}

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
    ServingData {
        indices: HashMap::new(),
        wine_reviews_data: HashMap::new(),
        wine_reviews_key_list: Vec::new(),
        celebrity_data: HashMap::new(),
        celebrity_key_list: Vec::new(),
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
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
