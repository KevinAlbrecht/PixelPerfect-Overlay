#[path = "utils.rs"]
mod utils;

#[tauri::command]
pub fn read_file(path: String) -> String {
    match std::fs::read(path) {
        Ok(bytes) => utils::get_b64_from_uint8(bytes),
        Err(e) => panic!("{}", e),
    }
}
