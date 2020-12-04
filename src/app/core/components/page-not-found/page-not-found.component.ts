import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="not-found">
      <div><h1>Oops!</h1></div>
      <div><h2>404 - page not found</h2></div>
      <button>go to home page</button>
    </div>
  `,
  styles: [
    `
      .not-found {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #fff;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: black;
      }
      .not-found div h1 {
        font-size: 10rem;
        background: url(../../../assets/img/milky-way.jpg) no-repeat;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      button {
        margin-top: 4rem;
        border-radius: 30px;
        background: linear-gradient(90deg, #ff8a00, #e52e71);
        color: #fff;
        transition: 0.5s;
      }
      button:hover {
        background: linear-gradient(180deg, #ff8a00, #e52e71);
      }
    `,
  ],
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
