## API specs and Documentation

<img src="https://validator.swagger.io/validator?url=https://raw.githubusercontent.com/UsableSystemsLab/tinyurlrep/api-specs/api-specs/api-examples/openapi.yaml">

### Usage

```
docker build . -t swagger-ui-image

docker run -p 1000:8080 -v $PWD/api-examples:/api-specs/ swagger-ui-image
```

Then go to http://localhost:1000



