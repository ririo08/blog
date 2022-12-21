---
title: Discordの疑似Vtuberキットが壊れたので修正した
date: 2022-12-21 23:42:00
tags:
  - Discord
  - CSS
---

どうも、リリオです。

今まで使っていた Discord の Overlay を使用した OBS の Vtuber キットが HTML の仕様変更により使えなくなってしまいました。

今回はこちらの修正をしたのでコードを置いておこうと思います。

<!-- more -->

```css
body {
  background-color: rgba(0, 0, 0, 0);
  margin: 0px auto;
  overflow: hidden;
}
div[class^='Voice_voiceContainer'] {
  position: absolute;
  bottom: 0;
  right: 50px;
}

div[class^='Voice_user'] {
  display: none;
}

img[class^='Voice_avatar'] {
  display: block;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: url(https://example.com/image.png) no-repeat; /* 画像のURLを指定する */
  width: 300px !important; /* 画像の横幅 */
  height: 300px !important; /* 画像の縦幅 */
  padding-left: 300px; /* 画像の横幅をもう一回 */
  filter: brightness(60%);
  opacity: 0.7;
  border-radius: 0 !important;
  transition: all 0.1s ease-in-out;
  margin-bottom: -30px;
}

img[class*='Voice_avatarSpeaking'] {
  border-color: transparent !important;
  filter: brightness(100%);
  opacity: 1;
  margin-bottom: -10px;
  animation: jumping 0.3s ease infinite alternate;
}

@keyframes jumping {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-10px);
  }
}

img[class^='Voice_avatar'] {
  display: none;
}

img[src="https://cdn.discordapp.com/avatars/なにかしらのID/なにかしらのID.jpg"] /* Discordの自画像のURL */
{
  display: block !important;
}
```

使用方法は以下の通り。

- [Discord Streamkit Overlay](https://streamkit.discord.com/overlay)から、Voice Widget を選択し、必要なオーバーレイの URL を取得する。
- OBS 上に展開後、上記 CSS をコピー＆ペーストする。
- Web ブラウザ上で、オーバーレイ上の自分の画像を右クリックして、<br>「画像のアドレスをコピー」を選択し、52 行目にある URL と置き換える。
- あとは使いたい画像を用意し、20 行目の URL と置き換える。

## 今までのが何で使えなくなったの？

そもそも今までのって何？と言う方は[OBS 用の Vtuber 風 Discord Overlay を作ってみた - リリオの日記型倉庫 3](https://ririogame.hatenablog.com/entry/2021/07/21/015918)をご覧ください。

まず、今回の更新で以下のような変更がページ上にされています。

```html
<div id="root">
  <div class="Voice_voiceContainer__adk9M">
    <ul class="Voice_voiceStates__a121W">
      <li class="Voice_voiceState__OCoZh">
        <img
          class="Voice_avatar__htiqH"
          src="https://cdn.discordapp.com/avatars/数字/画像.jpg"
          alt=""
        />
        <div class="Voice_user__8fGwX">
          <span
            class="Voice_name__TALd9"
            style="color: rgb(255, 255, 255); font-size: 14px; background-color: rgba(30, 33, 36, 0.95);"
          >
            リリオ
          </span>
        </div>
      </li>
    </ul>
  </div>
</div>
```

ちょっと今までのページがどういう構成になったのか覚えてないのですが、  
クラス名に謎のソルトが付くようになっており、  
それによって今までの CSS が効かないようになっていた模様です。

それに加えて、ユーザを特定するための値が取得できなくなりました。  
正確にはできるのですが、Discord の ID から指定することはできなくなっています。

## どのような対応をしたの？

CSS そのものは変更せず、CSS を当てる先を上手いことソルトを避けて指定できるようにしました。

例えば、`Voice_user__8fGwX`ですが、  
今回の場合では`div[class^='Voice_user']`といった感じで指定することによって、  
前方一致で取得できるように変更しています。

ユーザの指定に関してですが、  
画像はユーザ別に決まっているものだったので、  
img タグの src 属性を上手く利用して他のユーザ分を非表示にしています。

今後ももしかすると overlay に変更が加わる可能性はあるのですが、  
2022-12-21 現在では問題なく動作することを確認しているので、  
もし使ってみたい方がいらっしゃいましたら使ってみてください。

## 〆

なにか分からないことがあったら Twitter などで質問してね！

さいごに、チャンネル登録とフォローとサブスクライブと 10000 チアーと 50000 スーパーチャットをお願いします。
