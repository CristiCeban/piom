import React from 'react';
import { StudentNavigator } from './StudentNavigator/StudentNavigator';
import { TeacherNavigator } from './TeacherNavigator/TeacherNavigator';
import { selectIsTeacher } from '@piom/auth';
import { useAppSelector } from '../store';

export function BottomTabs() {
  const isTeacher = useAppSelector(selectIsTeacher);
  if (isTeacher) {
    return <TeacherNavigator />;
  }
  return <StudentNavigator />;
}
