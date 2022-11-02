const option = [
    'Fiction',
    'History',
    'Personal Finance',
    'Personal Growth',
    'Business & Economics',
    'Music',
    'Classical',
    'Juvenile Fiction',
    'Poetry',
    'Genral',
    'Literary',
    'Motivational',
    'Science',
    'Self-Help',
    'Success',
    'True Crime',
    'Action',
    'Mental Health',
    'Medical',
    'Biography & Autobiography',
    'Personal Memoir',
    'Education',
    'Literary Collections',
    'Cooking Courses',
    'Short Stories',
    'Science Fiction',
    'Art',
    'Humor',
    'Horror',
    'Fantasy',
    'Comics',
    'Grapjic Novel',
    'Games',
    'Web Programming',
    'Computers',
    'Data Science',
    'Programming',
    'Dance',
    'Media',
    'Yoga',
    'Magic'
]

let new_options = []

option.forEach(element => {
    new_options.push({value : element , label  : element})
});

export default new_options;