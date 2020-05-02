<template>
  <table class="message-table">
    <thead>
      <tr class="header">
        <td>時間</td>
        <td>
          科目
        </td>
        <td>
          単元
        </td>
        <td>内容</td>
        <td>チェック</td>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-yel">
        <td>1</td>
        <td>
          国語
        </td>
        <td>
          きつつきの商売
        </td>
        <td>
          ① P16～P25 を音読します。 ② 場面の様子を思い浮かべながら音読できるよう
        </td>
        <td />
      </tr>
      <tr class="bg-yel">
        <td>2</td>
        <td>
          数学
        </td>
        <td>
          かけ算のきまり
        </td>
        <td>
          教科書Ｐ10～12
        </td>
        <td />
      </tr>
      <tr class="bg-yel">
        <td>3</td>
        <td>
          社会
        </td>
        <td>
          地図のやくそく(1)
        </td>
        <td>
          （地図帳 P９～P10）をもとに、方位について調べます。
          ・家から見た東西南北はどちらか、方位を調べてみよう。 ・地図帳 P10
          トライ！に取り組もう。
        </td>
        <td />
      </tr>
      <tr>
        <td>4</td>
        <td>
          理科
        </td>
        <td>
          春に見られるいろいろな生き物
        </td>
        <td>
          （P10～P11）の写真をみて、春の生き物の すがたをくわしく調べましょう。
        </td>
        <td />
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Print',
  layout: 'print',
}
</script>

<style>
/*! CSS Used from: https://sho.benesse.co.jp/common/_share19.css */
table,
tbody,
tr,
td,
ruby {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
@media print, screen and (min-width: 769px) {
  .m-n-display--none__pc {
    display: none;
  }
}
@media (min-width: 769px) {
  .message-table {
    color: #0071c2;
    width: 1024px;
    margin: 0 auto 12px;
    border: solid 4px #0071c2;
  }
  .message-table tr {
    border: solid 2px #0071c2;
  }
  .message-table tr td {
    font-size: 14px;
    vertical-align: middle;
    line-height: 54px;
    border-right: solid 2px #0071c2;
    text-align: center;
    min-width: 85px;
  }
  .message-table tr td:first-child {
    font-size: 40px;
  }
  .message-table tr td:nth-last-child(2) {
    text-align: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.5;
    width: 400px;
    padding: 6px 20px;
  }
  .message-table tr td:last-child {
    border-right: none;
  }
  .message-table tr.header {
    color: #fff7e3;
    background-color: #0071c2;
  }
  .message-table tr.header td {
    border-right: solid 2px #fff7e3;
    font-size: 20px;
  }
  .message-table tr.header td:nth-last-child(2) {
    text-align: center;
  }
  .message-table tr.header td:last-child {
    border-right: none;
  }
  .message-table tr.bg-yel {
  }
}
@media (max-width: 768px) {
  .message-table {
    color: #0071c2;
    width: 100%;
    margin: 0 auto 12px;
    border: solid 4px #0071c2;
  }
  .message-table tr {
    border: solid 2px #0071c2;
  }
  .message-table tr td {
    font-size: 14px;
    vertical-align: middle;
    line-height: 54px;
    border-right: solid 2px #0071c2;
    text-align: center;
  }
  .message-table tr td:first-child {
    min-width: 50px;
    font-size: 30px;
  }
  .message-table tr td:nth-child(2) {
    min-width: 55px;
  }
  .message-table tr td:nth-last-child(2) {
    font-size: 11px;
    padding: 9px 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.3;
    text-align: left;
  }
  .message-table tr td:last-child {
    border-right: none;
  }
  .message-table tr.header {
    color: #fff7e3;
    background-color: #0071c2;
  }
  .message-table tr.header td {
    border-right: solid 2px #fff7e3;
  }
  .message-table tr.header td:first-child {
    font-size: 18px;
  }
  .message-table tr.header td:last-child {
    border-right: none;
  }
  .message-table tr.bg-yel {
  }
}
</style>
