import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Box, Icon, IconButton, Spinner, Text } from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

export type TopicElementProps = {
  id: number;
  name: string;
  description: string;
  deadline: string;
  teacher_id?: number;
  student_id?: number;
};

type TopicElementPropsEnhanced = TopicElementProps & {
  isSelected: boolean;
  onPress?: () => void;
  onPressCheckMark?: () => void;
  isLoading?: boolean;
};

export function TopicElement({
  deadline,
  description,
  name,
  isSelected,
  onPress,
  onPressCheckMark,
  isLoading,
}: TopicElementPropsEnhanced) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          <Box
            p="4"
            bg={isSelected ? 'indigo.700' : 'indigo.500'}
            borderRadius="md"
          >
            {children}
          </Box>
        </TouchableOpacity>
      );
    }
    return (
      <Box
        p="4"
        bg={isSelected ? 'indigo.700' : 'indigo.500'}
        borderRadius="md"
      >
        {children}
      </Box>
    );
  };

  return (
    <Wrapper>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Text fontSize="lg" color={isSelected ? 'white' : 'black'}>
            {name}
          </Text>
          <Text fontSize="sm" color={isSelected ? 'white' : 'black'}>
            {description}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color={isSelected ? 'white' : 'black'}>
            {deadline.substring(0, 10)}
          </Text>
        </Box>
      </Box>
      {!isSelected && (
        <Box alignItems="flex-end">
          {isLoading ? (
            <Spinner color="#22c55e" size="large" />
          ) : (
            <IconButton
              icon={
                <Icon
                  as={Ionicons}
                  name="checkmark-circle-outline"
                  size="2xl"
                  color="green.500"
                />
              }
              onPress={onPressCheckMark}
            />
          )}
        </Box>
      )}
    </Wrapper>
  );
}
