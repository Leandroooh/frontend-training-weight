import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WorkoutInfo } from "@/components/workouts/WorkoutInfo";
import { useWorkouts, type WorkoutDetails } from "@/hooks/useWorkouts";

export function WorkoutPage() {
  const { id } = useParams<{ id: string }>();
  const { fetchWorkoutById } = useWorkouts();
  const [workout, setWorkout] = useState<WorkoutDetails | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/dashboard");
      return;
    }

    (async () => {
      const data = await fetchWorkoutById(id);
      setWorkout(data);
    })();
  }, [fetchWorkoutById, id, navigate]);

  if (!workout) {
    return null;
  }

  const date = workout.date ? workout.date.split("-").reverse().join("/") : "";
  console.log(date);
  return (
    <div className="flex flex-col gap-2">
      <WorkoutInfo createdAt={date} id={workout.id} title={workout.name} />
    </div>
  );
}
