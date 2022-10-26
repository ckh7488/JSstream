## 웹환경에서의 JS Stream 확인

1. 용량이 큰 데이터를 전송 할 경우, 그냥 object 형태로 fetch할 경우 정상적으로 전달되지 않는다.
  - 클라이언트에서는 **FormData**를 사용하여 전달하고, 서버에서는 FormData parser기능을 사용(라이브러리 또는 직접구현, 현재 프로젝트는 `busboy`사용)하여 데이터를 받는다
  - 서버에서 **Stream** 객체를 생성, response에 **pipe** 하여, 큰 데이터를 잘라서 보낸다. 클라이언트는 **getReader**를 이용하여 readable에서 데이터를 하나씩 받아온다.
  
