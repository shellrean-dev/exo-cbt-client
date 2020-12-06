# ExtraordinaryCBT

ExtraordinaryCBT adalah aplikasi pengelola ujian berbasis komputer dapat diajalankan online maupun lokal, hosting maupun vps. aplikasi ini hanya frond end yang dibangun diatas vuejs.

# Features!

  - Setting sekolah
  - Jurusan
  - Peserta
  - Matpel
  - User
  - Banksoal
  - Event ujian
  - Jadwal ujian
  - File media
  - Status ujian
  - Status peserta ujian
  - Koreksi esay
  - Menu reporting - capaian siswa
  - Menu reporting - kesulitan soal
  - Hasil ujian


Lainnya:
  - Pengaturan sesi dapat dilakukan didalam event ujian
  - Setting penggunaan token (on/off)
  - Multi ujian

Tipe soal:
  - Pilihan ganda
  - Pilihan ganda kompleks
  - Listening
  - Menjodohkan
  - Isian singkat
  - Uraian


### Tech

ExtraordinaryCBT uses a number of open source projects to work properly:

* [VueJs] - The Progressive JavaScript Framework.
* [Bootstrap] - The most popular HTML, CSS, and JS library in the world.
* [Vuex] - State management pattern + library for Vue.js applications.
* [Vue-Router] - The official router for Vue.js.
* [CkEditor] - Rock-solid, free WYSIWYG editor with collaborative editing.

### Installation

ExtraordinaryCBT requires [Node.js](https://nodejs.org/) v12+ to run.

make copy .env-example to .env and configure it
``` env
VUE_APP_ENV=deplopment
VUE_APP_VERSION="2.0.0"
VUE_APP_URL=http://localhost
```

Install the dependencies and devDependencies and start the server.

```sh
$ cd extraordinarycbt-self
$ yarn install
$ yarn serve
```

For production environments...

```sh
$ yarn build
```

![Kumpulan soal](/screenshoot/1.png?raw=true "Tampilan kumpulan soal")

### Development

Want to contribute? Great!

Dillinger uses Vue+ Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [VueJs]: <http://vuejs.org>
   [Bootstrap]: <https://www.getbootstrap.com>
   [Vuex]: <https://vuex.vuejs.org>
   [Vue-Router]: <https://router.vuejs.org>
   [CkEditor]: <https://ckeditor.com>
Developed by [Shellrean](https://shellrean.com/)