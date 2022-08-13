VERSION 0.6
FROM alpine

lint:
  BUILD +lint.prettier

lint.prettier.fix:
  FROM tmknom/prettier
  COPY . /workspace
  RUN prettier -w /workspace
  SAVE ARTIFACT /workspace/* AS LOCAL ./

lint.prettier:
  FROM tmknom/prettier
  COPY . .
  RUN prettier .
