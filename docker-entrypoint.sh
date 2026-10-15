#!/bin/sh
set -eu

node -e '
const imageRevision = process.env.IMAGE_REVISION ?? "";
const sourceCommit = process.env.SOURCE_COMMIT ?? "";

if (!/^[0-9a-f]{40}$/.test(imageRevision)) {
  console.error("Image does not contain a full lowercase 40-character revision.");
  process.exit(1);
}

if (sourceCommit !== imageRevision) {
  console.error("SOURCE_COMMIT does not match this image revision; refusing to start.");
  process.exit(1);
}
'

exec "$@"
