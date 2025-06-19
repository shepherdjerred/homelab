# Dagger Test Scripts

This directory contains test scripts for validating Dagger builds.

## test-ha-image.ts

This script tests the Home Assistant (HA) image build process by:

1. Building the HA image using Dagger
2. Exporting it to a tar file on the host
3. Loading it into Docker
4. Running the image to verify it starts correctly
5. Testing basic connectivity (if applicable)
6. Cleaning up all test artifacts

### Usage

```bash
# Make sure you're in the project root directory
cd /path/to/homelab-docker

# Run the test script
bun run .dagger/test/test-ha-image.ts
```

### Prerequisites

- Bun runtime installed
- Docker installed and running
- Dagger CLI available in PATH
- The HA source code in `src/ha/` directory

### What it tests

- **Build Process**: Verifies that the Dagger build pipeline works correctly
- **Image Export**: Tests that the image can be exported to a tar file
- **Docker Load**: Confirms the exported image can be loaded into Docker
- **Container Startup**: Validates that the container starts without crashing
- **Basic Connectivity**: Attempts to test if the application responds (optional)

### Cleanup

The script automatically cleans up all test artifacts:
- Stops and removes test containers
- Removes test images from Docker
- Deletes temporary tar files

### Troubleshooting

If the test fails:

1. Check that all prerequisites are installed
2. Verify that the HA source code builds correctly: `cd src/ha && bun run build`
3. Ensure Docker is running and accessible
4. Check Dagger logs for build errors
5. Review container logs if the container stops unexpectedly

The script provides detailed output showing which step failed, making it easier to debug issues.
