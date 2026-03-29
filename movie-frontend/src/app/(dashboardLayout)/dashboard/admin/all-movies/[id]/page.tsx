import EditMovieForm from '@/src/app/components/Layout/EditMovieForm'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div>
            <EditMovieForm id={id} />
        </div>
    )
}
