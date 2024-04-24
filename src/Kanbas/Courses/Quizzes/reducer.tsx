import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
  quiz: { name: "New Quiz", published: false },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [
        action.payload,
        ...state.quizzes,
      ] as typeof state.quizzes;
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setPublish: (state, action) => {
      const quiz = state.quizzes.find(
        (quiz) => quiz._id === action.payload.quizId
      );
      if (quiz) {
        quiz.published = action.payload.published;
      }
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
  setPublish,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
