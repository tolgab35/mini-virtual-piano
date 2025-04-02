const keyMappings = {
  Q: "C",
  W: "D",
  E: "E",
  R: "F",
  T: "G",
  Y: "A",
  U: "B",
  I: "C-high",
  2: "C-sharp",
  3: "D-sharp",
  4: "F-sharp",
  5: "G-sharp",
  6: "A-sharp",
};

document.addEventListener("DOMContentLoaded", () => {
  // Tüm piyano tuşlarını seç
  const keys = document.querySelectorAll(".key");

  keys.forEach((key) => {
    key.addEventListener("click", () => {
      playNote(key.innerText); // Tuşun içindeki harfi fonksiyona gönder
      animateKey(key); // Görsel geri bildirim sağla
    });
  });

  // Klavyeden bir tuşa basıldığında ilgili sesi çal ve animasyon ekle
  document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase(); // Harfleri büyük hale getir
    if (keyMappings[key]) {
      playNote(key);
      animateKey(key);
    }
  });
});

/**
 * Belirtilen tuşun notasını çalan fonksiyon
 * @param {string} key - Kullanıcının bastığı tuş
 */
function playNote(key) {
  const note = keyMappings[key]; // Eşleşen notayı al
  if (!note) return; // Eğer geçerli bir nota yoksa fonksiyondan çık

  const audio = new Audio(`sounds/${note}.wav`); // Ses dosyasının yolunu oluştur
  audio.currentTime = 0;
  audio.play();
}

/**
 * Tuşa basıldığında animasyon ekleyen fonksiyon
 * @param {string|HTMLElement} key - Basılan tuş ya da tuşun DOM öğesi
 */
function animateKey(key) {
  // Eğer key DOM öğesi değilse, yani bir harfse, doğru DOM öğesini bul
  const keyElement =
    typeof key === "string"
      ? [...document.querySelectorAll(".key")].find(
          (el) => el.innerText === key
        )
      : key;

  if (keyElement) {
    keyElement.classList.add("active"); // 'active' sınıfını ekle
    setTimeout(() => keyElement.classList.remove("active"), 100); // 100ms sonra geri al
  }
}
