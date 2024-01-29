import lzstring from "lz-string";

export type CompressFile = {
	fileData: {
		name: string;
		fileName: string;
		type: string;
		data: string;
	}[];
	mainModule?: string;
};

export async function compressFile({ fileData, mainModule }: CompressFile): Promise<string> {
	const worker = new FormData();

	const today = new Date();
	const year = String(today.getUTCFullYear());
	const month = String(today.getUTCMonth() + 1).padStart(2, "0");
	const date = String(today.getUTCDate()).padStart(2, "0");

	const metadata = {
		main_module: mainModule || "index.js",
		compatibility_date: `${year}-${month}-${date}`,
		compatibility_flags: ["nodejs_compat"],
	};

	worker.set("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));

	for (const file of fileData) {
		worker.set(
			file.name,
			new Blob([file.data], {
				type: file.type,
			}),
			file.fileName,
		);
	}

	const serialisedWorker = new Response(worker);
	return lzstring.compressToEncodedURIComponent(
		`${serialisedWorker.headers.get("content-type")}:${await serialisedWorker.text()}`,
	);
}

export async function getDeployUrl({ fileData, mainModule }: CompressFile): Promise<string> {
	const compressedFile = await compressFile({ fileData, mainModule });
	return `https://dash.cloudflare.com/workers-and-pages/deploy/playground/workers-playground#${compressedFile}`;
}
