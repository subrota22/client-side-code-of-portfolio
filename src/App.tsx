.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.styleHeadOfContent{
 transform: rotateX(-2deg) rotateY(42deg);
 margin: 60px 0px;
 /* background-color: rgba(48, 4, 21, 0.7); */
 box-shadow: 0 0 8px 8px rgba(192, 7, 78, 0.6);
 width: 90%;
 color: white;
}
.styleHeadOfContent:hover{
  transform: rotateX(0deg) rotateY(0deg);
  box-shadow: 0 0 8px 8px rgba(6, 68, 184, 0.6);
  color: lime;
  transition-duration: 1s;
  animation: spinHead 2 linear forwards 6s alternate;
  cursor:pointer;
}
@keyframes spinHead {
  0%{
    transform: rotate(0deg) scale(0.8);
  } 100%{
    transform: rotate(380deg) scale(1)
  }
}

.logo{
animation: logoSpin infinite 6s forwards linear;
height: 40%;
width: 40%;
}
@keyframes logoSpin {
 0%{
  transform:rotate(0deg);
 }  100%{
  transform:rotate(360deg);
 } 
}
.dflex{
display: flex;
justify-content: space-around;
font-size: 18px;
font-weight: bolder;
width: 100%;
}
.fline , .sline{
background-color: white;
border: 2px solid white;
border-radius: 5px;
width:32%;
height: 5px;
margin-top: 10px;
animation: textLine infinite 2s alternate;
}
@keyframes textLine {
  0%{
    background-color: rgb(251, 249, 255);
    border: 2px solid rgb(255, 255, 255);
  }  100%{
    background-color: rgb(33, 4, 100);
    border: 2px solid rgb(33, 4, 100);
  } 
 }
 @media screen and (max-width:800px) {
  .dflex{
    display: flex;
    justify-content: space-around;
    font-size: 18px;
    font-weight: bolder;
    flex-direction: column-reverse;
    width: 100%;
    }
 }

 .activeButton{
 box-shadow:  0 0 6px 6px rgba(14, 202, 162, 0.6);
 color: white;
 background-color: rgb(155, 22, 84);
 border: none;
 border-radius: 8px
 }
 .activeButton:hover{
  animation: activeButton infinite 0.7s alternate;
 }

 @keyframes activeButton {
  0%{
    background-color: rgba(184, 10, 126, 0.6);
    border-radius: 8px;
    border: none;
  }  100%{
    background-color:  rgba(7, 45, 170, 0.6);
    border-radius: 8px;
    border: none;
  } 
 }
.skillCard{
box
}
 .link{
height: 58px;
width: 62px;
background-color: blueviolet
 }
 .hoverEffect:hover{
 transform: scale(0.9);
 transition-duration: 2s;
 }
 .contactInfo ul li {
  list-style-type: none;
  list-style-position: inside;
  margin: 14px 10px ;
  font-size: 20px;
  font-weight: bolder;
 }
 .contactInfo ul li  a{
  text-decoration: none;
  color: white;
 }
 .contactInfo ul li  span{
  height:45px;
  width: 45px;
  border-radius: 50%;
  background-color: #EE0BB7;
  padding:6px 8px;
  margin: 10px;
 }
 .contactInfo ul li:hover >  span{
  background-color:#0B68EE;
  transition-duration: 1s;
 }