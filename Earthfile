VERSION 0.6
FROM alpine

lint:
  BUILD +lint.prettier

lint.prettier.fix:
  FROM tmknom/prettier
  COPY . .
  RUN prettier -w .
  SAVE ARTIFACT * AS LOCAL .

lint.prettier:
  FROM tmknom/prettier
  COPY . .
  RUN prettier .
