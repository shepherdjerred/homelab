VERSION 0.7
ARG --global EARTHLY_CI

lint:
  FROM node:lts
  WORKDIR /workspace
  COPY . .
  IF [ $EARTHLY_CI = true ]
    RUN npx prettier .
  ELSE
    RUN npx prettier -w .
    SAVE ARTIFACT * AS LOCAL ./
  END
