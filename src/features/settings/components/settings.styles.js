import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";

export const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

export const AvatarContainer = styled.View`
  align-items: center;
`;

export const AvatarIcon = styled(Avatar.Icon).attrs({
  size: 180,
  backgroundColor: colors.brand.primary,
})``;
export const AvatarImage = styled(Avatar.Image).attrs({
  size: 180,
  backgroundColor: colors.brand.primary,
})``;
