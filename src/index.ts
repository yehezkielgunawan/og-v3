import { ImageResponse } from 'workers-og';

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const params = new URLSearchParams(new URL(request.url).search);
		const title = params.get('title') || 'Lorem ipsum';
		const subtitle = params.get('subtitle') || 'Subtitle';
		const baseImage =
			params.get('bgImage') || 'https://res.cloudinary.com/yehez/image/upload/v1646485864/yehez_avatar_transparent_swwqcq.png';
		const siteName = params.get('siteName') || 'yehezgun.com';

		const html = `
		<div
			style="
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 100vh;
				width: 100vw;
				font-family: sans-serif;
				background: #160f29;
			"
		>
			<div style="display: flex; width:100vw; align-items: center; justify-content: space-between; padding: 36px; height: 83.33%">
				<div style="display: flex; flex-direction: column; gap: 24px;">
					<h1 style="font-size: 60px; margin: 0; font-family: 'Bitter'; font-weight: bold; color: white">${title}</h1>
					<h2 style="font-size: 36px; margin: 0; font-family: 'Bitter'; font-weight: 400; color: white">${subtitle}</h2>
				</div>
				<figure>
					<img
						src=${baseImage}
						alt="og-image"
						width="256"
						height="256"
					/>
				</figure>
			</div>
			<div
				style="
					width: 100vw;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 16.67%;
					color: white;
					padding: 36px;
				"
			>
				<p style="font-size: 24px; margin: 0; font-family: 'Bitter'; font-weight: 500; color: white; text-align: right">${siteName}</p>
				<p style="font-size: 24px; margin: 0; font-family: 'Bitter'; font-weight: 500; color: white">Twitter: @yehezgun</p>
			</div>
		</div>
   `;

		return new ImageResponse(html, {
			width: 1278,
			height: 720,
		});
	},
};
