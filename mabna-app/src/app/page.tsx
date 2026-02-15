import Image from "next/image";
import Link from "next/link";
import { BookOpen, Sun, Users, Calendar, MapPin } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const supabase = await createClient();

  // Fetch Programs
  const { data: programs } = await supabase
    .from("programs")
    .select("*")
    .order("order", { ascending: true });

  // Fetch Latest Activities
  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .order("event_date", { ascending: false })
    .limit(4);

  // Icon Mapper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen": return <BookOpen className="text-[var(--accent-olive)] h-8 w-8 transition-colors group-hover:text-[var(--accent-gold)]" />;
      case "Sun": return <Sun className="text-[var(--accent-olive)] h-8 w-8 transition-colors group-hover:text-[var(--accent-gold)]" />;
      case "Users": return <Users className="text-[var(--accent-olive)] h-8 w-8 transition-colors group-hover:text-[var(--accent-gold)]" />;
      default: return <BookOpen className="text-[var(--accent-olive)] h-8 w-8 transition-colors group-hover:text-[var(--accent-gold)]" />;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/assets/FotoGeneral/MusyMuhasibi-1.png"
            alt="Suasana tenang di dalam Asrama Al Muhasibi"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight font-heading">
              Media Dakwah & Dokumentasi Asrama Al Muhasibi
            </h1>
            <blockquote className="mt-6 border-l-4 border-[var(--accent-gold)] pl-4">
              <p className="text-lg md:text-xl font-light font-amiri italic">
                Menjadi pusat pengembangan spiritual dan intelektual bagi
                mahasiswa dalam naungan nilai-nilai Islam, Menghasilkan generasi
                Ulul Albab
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Welcome & Quote Section */}
      <section className="py-20 md:py-28 bg-[var(--background)] border-y border-[var(--border-color)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-[var(--accent-olive)] font-heading">
              Selamat Datang di Ruang Digital Kami
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Website ini didedikasikan untuk menyebarkan informasi,
              mendokumentasikan kegiatan, dan menjadi sarana dakwah bagi seluruh
              civitas akademika, wali santri, dan masyarakat umum yang tertarik
              dengan kehidupan di Asrama Al Muhasibi.
            </p>
          </div>

          <div className="text-center max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            <blockquote className="relative">
              <div className="mt-10 text-center">
                <p className="text-2xl md:text-3xl italic text-[var(--text-primary)] leading-relaxed font-amiri">
                  خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ
                </p>
                <p className="mt-3 text-base md:text-lg text-[var(--text-secondary)]">
                  Artinya: "Sebaik-baik manusia adalah yang paling bermanfaat
                  bagi manusia".
                </p>
                <p className="mt-1 text-sm md:text-base text-[var(--text-secondary)] italic">
                  (HR. Ahmad, ath-Thabrani, ad-Daruquthni)
                </p>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Program Unggulan Section */}
      <section id="kegiatan-preview" className="py-20 md:py-28 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-[var(--accent-olive)] font-heading">
              Program Unggulan
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Fokus utama pembinaan di Asrama Al Muhasibi untuk membentuk
              pribadi yang seimbang antara spiritualitas dan intelektualitas.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs && programs.length > 0 ? (
              programs.map((program, index) => (
                <div
                  key={program.id}
                  className="card-program bg-[var(--foreground)] p-8 rounded-xl shadow-sm border border-[var(--border-color)] group"
                  data-aos="fade-up"
                  data-aos-delay={(index + 1) * 100}
                >
                  <div className="bg-[var(--accent-olive)]/10 inline-flex p-3 rounded-full mb-5 transition-colors group-hover:bg-[var(--accent-gold)]/20">
                    {getIcon(program.icon_name || 'BookOpen')}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)] font-heading">
                    {program.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {program.description}
                  </p>
                </div>
              ))
            ) : (
              /* Fallback if no data (Static) */
              <>
                <div className="card-program bg-[var(--foreground)] p-8 rounded-xl shadow-sm border border-[var(--border-color)] group" data-aos="fade-up" data-aos-delay="100">
                  <div className="bg-[var(--accent-olive)]/10 inline-flex p-3 rounded-full mb-5 transition-colors group-hover:bg-[var(--accent-gold)]/20">
                    <BookOpen className="text-[var(--accent-olive)] h-8 w-8 transition-colors group-hover:text-[var(--accent-gold)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)] font-heading">Taklim Afkar</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">Mengkaji kitab-kitab klasik dan kontemporer untuk memperdalam pemahaman keislaman.</p>
                </div>
                <div className="card-program bg-[var(--foreground)] p-8 rounded-xl shadow-sm border border-[var(--border-color)] group" data-aos="fade-up" data-aos-delay="200">
                  <div className="bg-[var(--accent-olive)]/10 inline-flex p-3 rounded-full mb-5 transition-colors group-hover:bg-[var(--accent-gold)]/20">
                    <Sun className="text-[var(--accent-olive)] h-8 w-8 transition-colors group-hover:text-[var(--accent-gold)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)] font-heading">Tahsin & Taklim Qur’an</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">Program intensif untuk memperbaiki bacaan dan mempelajari Qur’an.</p>
                </div>
                <div className="card-program bg-[var(--foreground)] p-8 rounded-xl shadow-sm border border-[var(--border-color)] group" data-aos="fade-up" data-aos-delay="300">
                  <div className="bg-[var(--accent-olive)]/10 inline-flex p-3 rounded-full mb-5 transition-colors group-hover:bg-[var(--accent-gold)]/20">
                    <Users className="text-[var(--accent-olive)] h-8 w-8 transition-colors group-hover:text-[var(--accent-gold)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)] font-heading">UPKM</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">Unit Pengembangan Kreativitas Mahasantri. Mengembangkan potensi melalui kreativitas dan kontribusi aktif.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Profil Singkat Section */}
      <section id="profil" className="py-20 md:py-28 bg-[var(--foreground)] border-y border-[var(--border-color)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" className="relative h-[400px] w-full rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/assets/FotoGeneral/gedungMuhasibi.jpg"
                alt="Gedung Asrama Al Muhasibi"
                fill
                className="object-cover"
                suppressHydrationWarning
              />
            </div>
            <div data-aos="fade-left">
              <h2 className="text-3xl font-bold text-[var(--accent-olive)] mb-4 font-heading">
                Mengenal Al Muhasibi
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6 font-body">
                Mabna Al-Muhasibi merupakan salah satu unit hunian asrama
                yang berada di bawah Pusat Ma’had al-Jami’ah (MSAA) UIN
                Maulana Malik Ibrahim Malang. Sebagai bagian dari sistem
                pembinaan mahasantri, Al-Muhasibi berperan dalam memperkuat
                pendidikan religius, intelektual, dan karakter mahasiswa
                melalui lingkungan asrama yang terintegrasi dengan
                nilai-nilai pesantren dan kampus.
              </p>
              <Link href="/profile" className="btn btn-primary inline-flex items-center justify-center">
                Lihat Profil Lengkap
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Preview Section (Kegiatan) */}
      <section id="kegiatan-mahasantri" className="py-20 md:py-28 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-[var(--accent-olive)] font-heading">
              Kegiatan Mahasantri
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Momen-momen berharga dari berbagai kegiatan yang kami
              selenggarakan.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {activities && activities.length > 0 ? (
              activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="card-program overflow-hidden rounded-lg shadow-md aspect-[3/4] relative group"
                  data-aos="fade-up"
                  data-aos-delay={(index + 1) * 100}
                >
                  <Image
                    src={activity.image_url || `https://placehold.co/800x600/212529/F8F9FA?text=${activity.title}`}
                    alt={activity.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{activity.title}</p>
                  </div>
                </div>
              ))
            ) : (
              /* Fallback (Static) */
              [
                "https://images.unsplash.com/photo-1604328993558-a0c445440763?q=80&w=800",
                "https://images.unsplash.com/photo-1618494432128-4499b78e9174?q=80&w=800",
                "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800",
                "https://images.unsplash.com/photo-1599485659222-289f682855e3?q=80&w=800"
              ].map((src, index) => (
                <div
                  key={index}
                  className="card-program overflow-hidden rounded-lg shadow-md aspect-[3/4] relative"
                  data-aos="fade-up"
                  data-aos-delay={(index + 1) * 100}
                >
                  <Image
                    src={src}
                    alt={`Kegiatan ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))
            )}
          </div>
          <div className="mt-12 text-center" data-aos="fade-up">
            <Link href="/kegiatan" className="btn btn-primary inline-flex items-center justify-center">
              Lihat Semua Kegiatan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

