use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use futures::future::{ready, Ready};
use hora;
use serde::Serialize;
use std::collections::HashMap;

#[derive(Serialize)]
struct WineReviewsSearchItem {}

#[derive(Serialize)]
struct WineReviewsSearchResp {
    resp: Vec<WineReviewsSearchItem>,
}

#[derive(Serialize)]
struct PicSearchItem {
    pic_name: String,
    pic_url: String,
}

#[derive(Serialize)]
struct PicSearchResp {
    resp: Vec<PicSearchItem>,
}

struct PicItem {
    pic_name: String,
    pic_url: String,
}

struct WineReviewsItem {
    id: String,
    country: String,
    description: String,
    designation: String,
    province: String,
}

struct ServingData {
    indices: HashMap<String, Box<hora::index::hnsw_idx::HNSWIndex<f32, String>>>,

    wine_reviews_data: HashMap<String, WineReviewsItem>,
    celebrity_data: HashMap<String, PicItem>,
    cats_data: HashMap<String, PicItem>,
}

fn prepare_data() -> ServingData {
    ServingData {
        indices: HashMap::new(),
        wine_reviews_data: HashMap::new(),
        celebrity_data: HashMap::new(),
        cats_data: HashMap::new(),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
        // .service(hello)
        // .service(echo)
        // .route("/hey", web::get().to(manual_hello))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
