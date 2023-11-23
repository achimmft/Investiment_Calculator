export default function Log({ log }) {
    return (
        <div className='log card'>
            <div>
                CourseId: {log.courseId}
            </div>
            <div>
                Date: {log.date}
            </div>
            <div>
                Log: {log.text}
            </div>
        </div>
    )
}