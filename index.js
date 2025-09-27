// index.js
require("dotenv").config(); // .env 파일 로드
const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 5000;

// Supabase 클라이언트 설정
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

app.use(express.json()); // JSON 요청 처리

// 샘플 데이터 저장 API
app.post("/samples", async (req, res) => {
  const { anon_id, decibel_value, location, device_info } = req.body;

  // supabase에 소음 샘플 저장
  const { data, error } = await supabase.from("noise_samples").insert([
    {
      anon_id,
      decibel_value,
      location,
      device_info,
    },
  ]);

  if (error) {
    return res
      .status(500)
      .json({ message: "Error saving noise sample", error });
  }

  res.status(201).json({ message: "Noise sample saved successfully", data });
});

// 기본 라우터
app.get("/", (req, res) => {
  res.send("NoiseTime Backend 서버가 실행되고 있습니다!");
});

// 서버 시작
app.listen(port, '0.0.0.0', () => {
  console.log(`서버가 포트 ${port}에서 실행되고 있습니다.`);
});
