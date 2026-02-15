import { createClient } from '@/utils/supabase/server'
import JadwalClient, { Jadwal } from './JadwalClient'

export const revalidate = 60 // revalidate every minute

export default async function JadwalPage() {
    const supabase = await createClient()
    
    // Fetch schedules from Supabase
    const { data: schedules } = await supabase
        .from('schedules')
        .select('*')
        .order('time_start', { ascending: true })

    // Map DB data to Frontend Interface
    const formattedData: Jadwal[] = (schedules || []).map(item => ({
        id: item.id,
        hari: item.day,
        waktu: `${item.time_start?.slice(0, 5) || ''} - ${item.time_end?.slice(0, 5) || ''}`,
        kegiatan: item.activity_name,
        tempat: item.location,
        penanggungJawab: '-', // Placeholder as field doesn't exist in DB
        kategori: 'Rutin Mingguan' // Default category
    }))

    return <JadwalClient initialData={formattedData} />
}
