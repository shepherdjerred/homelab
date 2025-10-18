#!/bin/bash
# Script to clean up Velero backups from Cloudflare R2 bucket
# Uses AWS CLI directly with credentials from environment

set -e

BUCKET="homelab"
PREFIX_BACKUPS="torvalds/backups/"
PREFIX_ZFS="zfspv-incr/"
ENDPOINT="https://48948ed6cd40d73e34d27f0cc10e595f.r2.cloudflarestorage.com"
REGION="auto"

echo "🧹 Cleaning up Velero backups from R2 bucket..."
echo ""

# List backup files
echo "📋 Listing backup files in s3://${BUCKET}/${PREFIX_BACKUPS}..."
aws s3 ls "s3://${BUCKET}/${PREFIX_BACKUPS}" \
  --recursive \
  --endpoint-url "${ENDPOINT}" \
  --region "${REGION}" \
  2>&1 | head -20 || echo "No files found or directory doesn't exist"

echo ""
read -p "❓ Delete all backup files? (yes/no): " confirm

if [ "$confirm" = "yes" ]; then
  echo "🗑️  Deleting backup files from s3://${BUCKET}/${PREFIX_BACKUPS}..."
  aws s3 rm "s3://${BUCKET}/${PREFIX_BACKUPS}" \
    --recursive \
    --endpoint-url "${ENDPOINT}" \
    --region "${REGION}"
  echo "✅ Backup files deleted"
else
  echo "❌ Skipping backup file deletion"
fi

echo ""
echo "📋 Listing ZFS snapshot files in s3://${BUCKET}/${PREFIX_ZFS}..."
aws s3 ls "s3://${BUCKET}/${PREFIX_ZFS}" \
  --recursive \
  --endpoint-url "${ENDPOINT}" \
  --region "${REGION}" \
  2>&1 | head -20 || echo "No files found or directory doesn't exist"

echo ""
read -p "❓ Delete all ZFS snapshot files? (yes/no): " confirm_zfs

if [ "$confirm_zfs" = "yes" ]; then
  echo "🗑️  Deleting ZFS snapshots from s3://${BUCKET}/${PREFIX_ZFS}..."
  aws s3 rm "s3://${BUCKET}/${PREFIX_ZFS}" \
    --recursive \
    --endpoint-url "${ENDPOINT}" \
    --region "${REGION}"
  echo "✅ ZFS snapshot files deleted"
else
  echo "❌ Skipping ZFS snapshot deletion"
fi

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📊 Final bucket status:"
aws s3 ls "s3://${BUCKET}/torvalds/" \
  --endpoint-url "${ENDPOINT}" \
  --region "${REGION}" || echo "Directory empty or doesn't exist"
