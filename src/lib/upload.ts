/**
 * Upload token metadata to Flap.sh IPFS
 * @see https://docs.flap.sh/flap/developers/launch-a-token
 */

const FLAP_UPLOAD_API = "https://funcs.flap.sh/api/upload";

export interface UploadMetaInput {
  name: string;
  symbol: string;
  description?: string;
  image: File;
  website?: string;
  twitter?: string;
  telegram?: string;
}

export async function uploadTokenMeta(
  input: UploadMetaInput
): Promise<string> {
  const form = new FormData();

  const MUTATION_CREATE = `mutation Create($file: Upload!, $meta: MetadataInput!) {
    create(file: $file, meta: $meta)
  }`;

  form.append(
    "operations",
    JSON.stringify({
      query: MUTATION_CREATE,
      variables: {
        file: null,
        meta: {
          website: input.website || null,
          twitter: input.twitter || null,
          telegram: input.telegram || null,
          description: input.description || null,
          creator: "0x0000000000000000000000000000000000000000",
        },
      },
    })
  );

  form.append("map", JSON.stringify({ "0": ["variables.file"] }));
  form.append("0", input.image);

  const res = await fetch(FLAP_UPLOAD_API, {
    method: "POST",
    body: form,
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to upload metadata: ${res.status} ${text}`);
  }

  const data = await res.json();
  const cid = data?.data?.create;

  if (!cid) {
    throw new Error("No CID returned from upload");
  }

  return cid;
}
