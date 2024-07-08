VERSION 0.8

ci:
  BUILD ./cdk8s+check
  BUILD ./cdk8s+build
  BUILD +pre-commit

pre-commit:
  FROM python
  WORKDIR /workspace

  RUN curl -fsSL https://deno.land/install.sh | sh
  ENV DENO_INSTALL="/root/.deno"
  ENV PATH="$DENO_INSTALL/bin:$PATH"
  RUN pip install pre-commit
  COPY --dir .pre-commit-config.yaml .
  COPY . .
  CACHE ~/.cache/pre-commit
  RUN pre-commit run --all-files

publish:
  # build a helm chart and push
