<script setup>
import { ref, onMounted } from 'vue'
import avatar1 from '@/assets/images/avatars/1.jpg'
import avatar2 from '@/assets/images/avatars/2.jpg'
import avatar3 from '@/assets/images/avatars/3.jpg'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import avatar6 from '@/assets/images/avatars/6.jpg'
import MainChart from './MainChart.vue'
import WidgetsStatsA from './../widgets/WidgetsStatsTypeA.vue'
import WidgetsStatsD from './../widgets/WidgetsStatsTypeD.vue'

// 1. Import konfigurasi Firebase yang sudah kamu buat sebelumnya
import { db, collection, getDocs } from '@/firebase'

// 2. Buat variabel reactive untuk menampung data dinamis dari Firebase
const totalVisits = ref(0)
const totalUnique = ref(0)
const totalPageviews = ref(0)
const totalNewUsers = ref(0)

const progressGroupExample1 = ref([])
const progressGroupExample2 = ref([])
const progressGroupExample3 = ref([])
const tableExample = ref([])

// 3. Fungsi untuk mengambil data dari Firestore
const fetchDashboardData = async () => {
  try {
    // Contoh mengambil data ringkasan angka dari sebuah dokumen di koleksi "summary"
    // Kamu bisa menyesuaikan struktur koleksi database milikmu sendiri
    const querySnapshot = await getDocs(collection(db, "dashboard_stats"))
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      if (doc.id === 'counters') {
        totalVisits.value = data.visits || 0
        totalUnique.value = data.unique || 0
        totalPageviews.value = data.pageviews || 0
        totalNewUsers.value = data.newUsers || 0
      }
    })

    // Contoh mengambil data untuk tabel User
    const usersSnapshot = await getDocs(collection(db, "users"))
    const loadedUsers = []
    usersSnapshot.forEach((doc) => {
      const userData = doc.data()
      loadedUsers.push({
        avatar: { src: avatar1, status: userData.status || 'success' }, // Avatar bisa disesuaikan dinamis
        user: {
          name: userData.name,
          new: userData.isNew,
          registered: userData.registeredDate,
        },
        country: { name: userData.countryName, flag: userData.countryFlag },
        usage: {
          value: userData.usageValue,
          period: userData.usagePeriod,
          color: userData.usageColor,
        },
        payment: { name: userData.paymentName, icon: userData.paymentIcon },
        activity: userData.lastActivity,
      })
    })
    tableExample.value = loadedUsers

    // Untuk progressGroupExample 1, 2, 3 tinggal lakukan hal yang sama 
    // dengan mengambil data dari koleksi Firestore masing-masing.

  } catch (error) {
    console.error("Gagal memuat data dari Firebase:", error)
  }
}

// 4. Jalankan fungsi fetch data saat halaman di-render
onMounted(() => {
  fetchDashboardData()
})
</script>
