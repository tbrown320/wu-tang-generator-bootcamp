document.querySelector('button').addEventListener('click',getWuTang);

function getWuTang() {
    //find the answer the user selected from each question
    let q1 = document.querySelector('input[name="q1"]:checked')
    let q2 = document.querySelector('input[name="q2"]:checked')
    let q3 = document.querySelector('input[name="q3"]:checked')
    let q4 = document.querySelector('input[name="q4"]:checked')
    let q5 = document.querySelector('input[name="q5"]:checked')
    console.log(q1, q2, q3, q4, q5)

    fetch(`/name?q1=${q1.value}&q2=${q2.value}&q3=${q3.value}&q4=${q4.value}&q5=${q5.value}`)
        .then(res => res.json())
        .then((wu_data) => {
            console.log(wu_data)
            let new_wu_name = wu_data.result
            document.querySelector('#wu_results').innerText = `Your Wu-Tang Clan name is now ... ${new_wu_name}`
        })
}