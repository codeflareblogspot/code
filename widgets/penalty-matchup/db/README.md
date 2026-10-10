# Penalty Matchup database

Database publik untuk widget **Penalty Matchup** di CodeFlare.

- `team-stats.js` — 32 tim: nama, kode, power, accuracy, catch, reflex, stamina, warna jersey dan keeper, plus judul Wikipedia.
- `info/<id>.js` — fakta singkat per tim. Satu tim = satu file supaya dapat diubah tanpa menyentuh database tim lain.
- Widget memuat statistik dari GitHub/jsDelivr dan memuat info tim secara lazy saat tim dipilih.
- Tidak memakai Composer, D1, atau backend untuk engine game.

Untuk update info Indonesia, cukup edit `info/idn.js`. Untuk update statistik tim, edit `team-stats.js`.
