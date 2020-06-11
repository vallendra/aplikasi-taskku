//PENTING: Jangan lupa setelah clone, jalankan `npm install` dulu lalu baru `npm run start`

// Import React (penting!) dan hook yang kita gunakan
import React, { useState } from 'react';

// Import komponen luar (seperti komponen UI framework) yang akan kita gunakan
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

// Import stylesheet luar agar kita bisa gunakan style
import "./App.css";

// Stuktur data yang akan kita buat
// const data = [
//   {
//     message: 'Cari makan',
//     id: 1
//   },
//   {
//     message: 'Belajar React',
//     id: 2
//   },
//   {
//     message: 'Belajar Lainnya',
//     id: 3
//   }
// ];

// Komponen Header
// Return elemen Heeader
const Header = () => {
  return <h1>Aplikasi Taskku
    <span role="img" aria-label="note">📝</span>
    </h1>
}

// Komponen Infobar
// Menerima prop taskNumber
// Return elemen InfoBar
const InfoBar = ({ taskNumber }) => {
  return <div>Ada {taskNumber} yang perlu dikerjakan</div>
};

// Komponen TaskAdder: Untuk menambah task
// Menerima prop: setTasks & tasks
// Mereturn elemen TaskAdder
const TaskAdder = ({ setTasks, tasks }) => {
  // State untuk menampung value pada input field
  const [currentValue, setCurrentValue] = useState('');

  // Handler (fungsi yang akan dilakukan jika pengguna melakukan
  // tindakan pada input tersebut)
  const handleAddTask = () => {
    // Buat variabel baru untuk task yang akan kita tambahkan
    const newTask = {
      id: tasks.length + 1,
      message: currentValue
    };
    // Set state tasks kita dengan merge array tasks yang lama dengan elemen task baru kita
    setTasks([...tasks, newTask]);
    // Set state currentValue kita biar kosong
    setCurrentValue('');
  }

  return <div className="task-adder">
    {/* Kita gunakan komponen UI luar berdasarkan dokumentasi yang diberikan */}
    <TextField
      value={currentValue}
      // Jika field berubah, maka...
      onChange={event => setCurrentValue(event.target.value)}
      label="Tambah task"
      variant="outlined"
    />
    <Button
      variant="contained"
      color="primary"
      // Jika currentValue kosong maka disabled menjadi true (button tidak bisa digunakan)
      disabled={currentValue === ''}
      // Jika field berubah, maka...
      onClick={() => handleAddTask()}>
      Tambah
    </Button>
  </div>
}

// Komponen Task
// Menerima prop message, id, setTasks, tasks
// Mereturn elemen task
const Task = ({ message, id, setTasks, tasks }) => {

  // Handler (fungsi yang akan dilakukan jika pengguna melakukan
  // tindakan pada input tersebut)
  const handleDelete = () => {
    // Kita buat variabel baru untuk mendapatkan array yang sudah dihilangkan
    // elemen yang memiliki id task yang akan dihapus
    const updatedTasks = tasks.filter(task => task.id !== id);
    // Set value tasks dengan array yang sudah diupdate
    setTasks(updatedTasks);
  }
  return <div className="container-task">
    <div className="task">
      <div style={{ display: "inline-block" }}>
        {message}
      </div>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={() => handleDelete()}
      >
        Delete
      </Button>
    </div>
  </div>
}

// Komponen TaskList
// Menerima prop tasks dan setTasks
// Mereturn komponen-komponen <Tasks />
const TaskList = ({ tasks, setTasks }) => {
  // Lakukan iterasi pada setiap item pada array si tasks
  // Di setiap item pada si tasks, kita akan return sebuah komponen <Task />
  return tasks.map((task, index) => {
    return <Task message={task.message} id={task.id} setTasks={setTasks} tasks={tasks} key={index} />
  })
}

const TaskApp = () => {
  // Buat state untuk menampung value task-task kita, state ini akan menjadi
  // sumber kebenaran untuk komponen yang kita buat
  const [tasks, setTasks] = useState([]);

  // Challenge: Bagaimana kalau kita ingin ambil data task-task kita dari luar, seperti dengan panggilan API?
  // Clue: gunakan hook useEffect() dan http caller seperti fetch() atau axios

  return <div className="container">
    <div id="child">
      <Header />
      <InfoBar taskNumber={tasks.length} />
      <TaskAdder setTasks={setTasks} tasks={tasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  </div>
};

const App = () => {
  // Return komponen (halaman) kita di App
  return <TaskApp />
};

export default App;