export default function formatDate(isoDate) {
    const datetime = new Date(isoDate);
    const format = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = datetime.toLocaleDateString(undefined, format);
    return formattedDate;
}

// ISO8601
// "2019-11-26T02:43:13.000+00:00"
// formatDate("2021-05-06T21:20:00.000-03:00")