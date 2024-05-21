document.getElementById('travelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Mengambil nilai-nilai formulir
    var name = document.getElementById('name').value;
    var destination = document.getElementById('destination').value;
    var travelDate = document.getElementById('travelDate').value;
    var travelType = document.getElementById('travelType').value;
    var activitiesElements = document.querySelectorAll('input[name="activities[]"]:checked');
    var activities = Array.from(activitiesElements).map(el => el.value);
    var photoInput = document.getElementById('photo');
    var reader = new FileReader();

    // Membaca file foto jika ada
    if (photoInput.files.length > 0) {
        reader.readAsDataURL(photoInput.files[0]);
    }

    // Ketika file selesai dibaca
    reader.onload = function(e) {
        // Menampilkan pratinjau gambar atau lakukan hal lain dengan file
        var imageDataUrl = e.target.result;

        // Menampilkan alert dengan SweetAlert2
        Swal.fire({
            title: 'Konfirmasi Perjalanan Anda',
            html: `
                <div class="form-values">
                    <div class="form-group">
                        <label for="name">Nama:</label>
                        <input type="text" value="${name}" readonly />
                    </div>
                    <div class="form-group">
                        <label for="destination">Destinasi:</label>
                        <input type="text" value="${destination}" readonly />
                    </div>
                    <div class="form-group">
                        <label for="travelDate">Tanggal Perjalanan:</label>
                        <input type="text" value="${travelDate}" readonly />
                    </div>
                    <div class="form-group">
                        <label for="travelType">Jenis Perjalanan:</label>
                        <input type="text" value="${travelType}" readonly />
                    </div>
                    <div class="form-group">
                        <label for="activities">Kegiatan:</label>
                        <input type="text" value="${activities.join(', ')}" readonly />
                    </div>
                    <div class="form-group">
                        <label for="photo">Foto:</label>
                        <img src="${imageDataUrl}" style="max-width: 100%;" />
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Simpan',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            customClass: {
                popup: 'swal-popup',
                htmlContainer: 'swal-html-container',
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Pengguna mengklik "ya"
                // Menampilkan pesan terima kasih
                Swal.fire({
                    title: 'Terima Kasih',
                    text: 'Terima kasih sudah berbagi pengalamanmu',
                    icon: 'success',
                    customClass: {
                        title: 'swal-title',
                        closeButton: 'swal-close-button'
                    }
                });
                // Lakukan pemrosesan lanjutan atau kirim formulir
                var travelData = {
                    name: name,
                    destination: destination,
                    travelDate: travelDate,
                    travelType: travelType,
                    activities: activities
                };
                console.log(travelData); // Menampilkan data perjalanan di konsol
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Pengguna mengklik "batal"
                // Menampilkan pesan pembatalan
                Swal.fire({
                    title: 'Dibatalkan',
                    text: 'Gak jadi',
                    icon: 'error',
                    customClass: {
                        title: 'swal-title',
                        closeButton: 'swal-close-button'
                    }
                });
            }
        });
    };
});
