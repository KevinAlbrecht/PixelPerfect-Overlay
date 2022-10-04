extern crate base64;

pub fn get_b64_from_uint8(buffer: Vec<u8>) -> String {
    base64::encode(buffer).into()
}
