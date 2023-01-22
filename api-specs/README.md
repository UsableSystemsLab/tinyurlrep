## API specs and Documentation

### Usage

```
docker build . -t swagger-ui-image

docker run -p 1000:8080 -v $PWD/api-examples:/api-specs/ swagger-ui-image
```