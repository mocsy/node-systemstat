use neon::prelude::*;
use systemstat::{System, Platform, saturating_sub_bytes, ByteSize};

#[derive(Debug, Clone)]
pub struct Memory {
    pub total: ByteSize,
    pub free: ByteSize,
}

impl Memory {
    fn to_js_object<'a>(&self, cx: &mut impl Context<'a>) -> JsResult<'a, JsObject> {
        let obj = cx.empty_object();
        
        let used = cx.string(saturating_sub_bytes(self.total, self.free).as_u64().to_string());
        obj.set(cx, "used_bytes", used)?;

        let total = cx.string(&self.total.as_u64().to_string());
        obj.set(cx, "total_bytes", total)?;

        let free = cx.string(&self.free.as_u64().to_string());
        obj.set(cx, "free_bytes", free)?;
        Ok(obj)
    }
}

pub fn sys_memory(mut cx: FunctionContext) -> JsResult<JsObject> {
    let sys = System::new();
    let res = match sys.memory() {
        Ok(mem) => Memory{ total: mem.total, free: mem.free }.to_js_object(&mut cx),
        Err(_) => Memory{ total: ByteSize::b(0), free: ByteSize::b(0) }.to_js_object(&mut cx)
    };
    Ok(res.unwrap())
}
