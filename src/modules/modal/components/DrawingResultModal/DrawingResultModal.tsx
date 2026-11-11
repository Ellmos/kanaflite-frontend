import { View } from 'react-native';

import Typography from '@components/base/Typography';
import CenteredModal from '@modal/components/base/CenteredModal';

import DrawingResultModalStyles from './DrawingResultModal.css';

export type DrawingResultModalProps = {
  target: string;
  predicted: string;
};

const DrawingResultModal = ({ target, predicted }: DrawingResultModalProps) => {
  const success = target.trim().toLowerCase() === predicted.trim().toLowerCase();

  return (
    <CenteredModal>
      <View style={DrawingResultModalStyles.container}>
        <View
          style={[
            DrawingResultModalStyles.iconContainer,
            success ? DrawingResultModalStyles.successIcon : DrawingResultModalStyles.failureIcon,
          ]}
        >
          <Typography style={DrawingResultModalStyles.icon}>{success ? '✓' : '✗'}</Typography>
        </View>

        <Typography style={DrawingResultModalStyles.title}>{success ? 'Excellent !' : 'Pas tout à fait !'}</Typography>

        <Typography style={DrawingResultModalStyles.subtitle}>
          {success ? 'Tu as parfaitement reconnu le dessin.' : 'Voici une comparaison de ta réponse.'}
        </Typography>

        <View style={DrawingResultModalStyles.body}>
          <View style={DrawingResultModalStyles.column}>
            <Typography style={DrawingResultModalStyles.label}>RÉPONSE ATTENDUE</Typography>

            <View style={DrawingResultModalStyles.resultCard}>
              <Typography style={DrawingResultModalStyles.result}>{target}</Typography>
            </View>
          </View>

          <View style={DrawingResultModalStyles.column}>
            <Typography style={DrawingResultModalStyles.label}>TA PRÉDICTION</Typography>

            <View
              style={[
                DrawingResultModalStyles.resultCard,
                success ? DrawingResultModalStyles.correctCard : DrawingResultModalStyles.incorrectCard,
              ]}
            >
              <Typography style={DrawingResultModalStyles.result}>{predicted || '—'}</Typography>
            </View>
          </View>
        </View>
      </View>
    </CenteredModal>
  );
};

export default DrawingResultModal;
