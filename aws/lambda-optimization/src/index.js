/**
 * Comparison api call between async/await and promise
 */
const RESET = "\x1b[0m";
const YELLOW = "\x1b[33m";
const start = Date.now();
main();

async function main() {
  return Promise.all([
    mainPromise(),
    mainWait(),
  ]);
}

async function mainWait() {
  const profile = await api().getProfile(1);
  const histories = await api().getHistories(1);
  const result = {
    ...profile.data,
    sum: histories.data.reduce((acc, cur) => acc + cur.cost, 0),
  }
  const end = Date.now();
  console.log('== mainAwait ==');
  console.log(result);
  console.log(YELLOW, `time: ${end - start}ms`, RESET);
}

async function mainPromise() {
  return Promise.all([
    api().getProfile(1),
    api().getHistories(1)
  ])
  .then(res => ({
    ...res[0].data,
    sum: res[1].data.reduce((acc, cur) => acc + cur.cost, 0),
  }))
  .then(result => {
    const end = Date.now();
    console.log('== mainPromise ==');
    console.log(result);
    console.log(YELLOW, `time: ${end - start}ms`, RESET);
  })

}

// API
function api() {
  function getProfile(id) {
    return sleep(3)
      .then(() => {
        validate(id);
        return {
          status: 200,
          name: 'SUCCEED',
          data: {
            firstname: 'Araiva',
            lastname: 'Viruskizz',
          }
        };
      });
  };
  function getHistories(id) {
    return sleep(3)
      .then(() => {
        validate(id);
        return {
          status: 200,
          name: 'SUCCEED',
          data: [
            {month: 1, cost: Math.round(Math.random() * 1000)},
            {month: 2, cost: Math.round(Math.random() * 1000)},
            {month: 3, cost: Math.round(Math.random() * 1000)},
          ]
        };
      })
  }
  return {
      getProfile,
      getHistories
  }
}

function sleep(time) {
    if (!time) {
        time = (Math.ceil(Math.random() * 50) + 10) / 10;
    }
    return new Promise(resolve => setTimeout(() => resolve(), time * 1000));
}

function validate(id) {
  if (!id) {
    throw {status: 400, name: 'BAD_REQUEST', message: 'need id parameter'};
  }
  if (id != 1) {
    throw {status: 404, name: 'NOT_FOUND', message: 'user is not existed'};
  }
}
