export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug;
    console.log(slug);
    return Response.json({ message: slug });
}
