# Camp-Izza-V2

Camp Izza system using Python backend

---

## Development

### Backend

- In the terminal, go into `backend` directory
- Install Python packages in `requirements.txt`
- Run `flask run`
- It should be running on `http://127.0.0.1:5000/`

### Frontend

- Go into `frontend` directory
- Run `npm install`
- Run `npm start`

---

## Deployment

### Backend

- In the terminal, go into `backend` directory
- Log into gcloud
- Run `gcloud builds submit`

### Frontend

- Go into `frontend` directory
- Make sure `.env.production.local` exists with the `REACT_APP_API` variable defined, shown in https://docs.google.com/document/d/1fAfbJJXjKoAPjt6Mar7kA0XmjmiffQPdKZba_k4r3J8/edit?usp=sharing
- Run `npm run build`
- Log into firebase with `firebase login`
- Run `firebase deploy`
