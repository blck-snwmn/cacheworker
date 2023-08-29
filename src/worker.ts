
export interface Env {
	CACHE_BUCKET: R2Bucket;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const object = await env.CACHE_BUCKET.get('key-id-xxxxxx');
		if (object === null) {
			return new Response('Not Found', { status: 404 });
		}
		return new Response(object.body, {
			status: 200,
			headers: {
				'Content-Type': object.httpMetadata?.contentType ?? "application/octet-stream"
			}
		});
	},
};
