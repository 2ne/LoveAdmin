import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Modal, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { AnimatePresence } from "framer-motion";
import { Motion } from "../../components/framer-motion-custom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const { TextArea } = Input;

const VoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<any>(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [editableTranscript, setEditableTranscript] = useState<string>("");

  useEffect(() => {
    setEditableTranscript(transcript);
  }, [transcript]);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableTranscript(e.target.value);
  };

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 100);
      }, 100);
    } else {
      clearInterval(timerRef.current);
      setElapsedTime(0);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [recording]);

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (event) => {
          const audioBlob = new Blob([event.data], { type: "audio/mp3" });
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
        };

        resetTranscript();
        setAudioURL("");
        mediaRecorder.current.start();
        SpeechRecognition.startListening({ continuous: true });
        setRecording(true);
      })
      .catch((err) => {
        message.error("Please enable microphone permission.");
        console.error(err);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
      mediaRecorder.current.stop();
    }
    SpeechRecognition.stopListening();
    setRecording(false);
    setEditableTranscript(
      (prevState) => prevState.charAt(0).toUpperCase() + prevState.slice(1)
    );
  };

  const padTimer = (num: number, digitCount: number): string => {
    return num.toString().padStart(digitCount, "0");
  };

  const elapsedTimeInMillis = Math.floor(elapsedTime);
  const minutes = Math.floor(elapsedTimeInMillis / 60000);
  const seconds = Math.floor((elapsedTimeInMillis % 60000) / 1000);
  const centiseconds = Math.floor((elapsedTimeInMillis % 1000) / 10);

  const formattedTime = `${padTimer(minutes, 2)}:${padTimer(
    seconds,
    2
  )}.${padTimer(centiseconds, 2)}`;

  return (
    <Modal
      open={true}
      okText="Save"
      width={350}
      rootClassName="[&_.ant-modal-content]:overflow-hidden"
      footer={false}
    >
      <div className="mt-6 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {recording && (
            <Motion animation="heightInOut" overflowHidden={false}>
              <>
                <div className="flex flex-col items-center justify-center gap-2 py-6">
                  <Button
                    className="rounded-full text-danger-500 bg-danger-50 border-danger-500 hover:bg-white"
                    size="large"
                    onClick={toggleRecording}
                    icon={
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <rect
                          width="12.5"
                          height="12.5"
                          x="5.75"
                          y="5.75"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          rx="1"
                        ></rect>
                      </svg>
                    }
                  ></Button>
                  <div className="tabular-nums text-danger-600">
                    {formattedTime}
                  </div>
                </div>
                {!transcript ? (
                  <div className="px-3.5 flex items-center py-2 mt-3 gap-2.5 rounded bg-neutral-100 ">
                    <InfoCircleOutlined className="relative text-lg -top-px text-neutral-500" />
                    <div className="max-w-[80%] mx-auto">
                      As you speak, your words will be transcribed and displayed
                      here.
                    </div>
                  </div>
                ) : (
                  <div className="first-letter:uppercase px-3.5 py-2.5 mt-3 border-l-2 rounded bg-danger-50 border-danger-500">
                    {transcript}
                  </div>
                )}
              </>
            </Motion>
          )}
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          {!recording && (
            <Motion animation="heightInOut" overflowHidden={false}>
              <>
                <div className="flex flex-col items-center justify-center gap-2 py-6">
                  <Button
                    className="text-white rounded-full bg-danger-500 border-danger-500 hover:bg-danger-400"
                    size="large"
                    onClick={toggleRecording}
                    icon={
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M8.75 8a3.25 3.25 0 016.5 0v3a3.25 3.25 0 01-6.5 0V8z"
                        ></path>
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M5.75 12.75s.25 4.5 6.25 4.5 6.25-4.5 6.25-4.5M12 17.75v1.5"
                        ></path>
                      </svg>
                    }
                  ></Button>
                  <div>
                    {audioURL ? "Record again?" : "Click to start recording"}
                  </div>
                </div>
              </>
            </Motion>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="popLayout">
        {!recording && audioURL && (
          <Motion animation="heightInOut" overflowHidden={false}>
            <div className="pt-6 mt-2 mb-4 border-t border-neutral-200">
              <label className="block mb-2 text-sm font-medium">
                Voice note
              </label>
              <audio className="w-full" controls src={audioURL}></audio>
            </div>
            <div className="mb-4">
              <TextArea
                value={editableTranscript}
                rows={4}
                onChange={handleTextAreaChange}
              />
            </div>
            <div className="relative flex justify-end gap-3 top-2">
              <Button>Cancel</Button>
              <Button type="primary">Save</Button>
            </div>
          </Motion>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default VoiceRecorder;
