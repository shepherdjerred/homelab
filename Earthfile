VERSION --build-auto-skip 0.8
PROJECT sjerred/homelab

ci:
  ARG --required version
  BUILD --auto-skip +pre-commit
  BUILD --auto-skip ./cdk8s+build
  WAIT
    BUILD --auto-skip ./ha+build
  END
  WAIT
    BUILD ./cdk8s/helm+publish --version=$version
  END
  BUILD +sync

kube-linter:
  ARG TARGETARCH
  ARG kube_linter_version=v0.6.8
  FROM curlimages/curl
  IF [ $TARGETARCH = "amd64" ]
    RUN curl -fsSL https://github.com/stackrox/kube-linter/releases/download/$kube_linter_version/kube-linter-linux -o kube-linter
  ELSE IF [ $TARGETARCH = "arm64" ]
    RUN curl -fsSL https://github.com/stackrox/kube-linter/releases/download/$kube_linter_version/kube-linter-linux_arm64 -o kube-linter
  ELSE
    RUN echo "Unsupported architecture: $TARGETARCH" && exit 1
  END
  RUN chmod +x kube-linter
  SAVE ARTIFACT kube-linter

sync:
  FROM curlimages/curl
  RUN --push --no-cache --secret ARGOCD_TOKEN curl -X POST https://argocd.tailnet-1a49.ts.net/api/v1/applications/torvalds/sync -H "Authorization: Bearer $ARGOCD_TOKEN" -H "Content-Type: application/json"

pre-commit:
  FROM python
  WORKDIR /workspace
  RUN curl -fsSL https://deno.land/install.sh | sh
  ENV DENO_INSTALL="/root/.deno"
  ENV PATH="$DENO_INSTALL/bin:$PATH"
  RUN pip install pre-commit
  COPY +kube-linter/kube-linter /usr/local/bin/

  COPY --dir .pre-commit-config.yaml .
  # init a dummy git repo because pre-commit requires it
  RUN git init
  CACHE ~/.cache/pre-commit
  RUN pre-commit install-hooks

  COPY . .
  RUN pre-commit run --all-files
