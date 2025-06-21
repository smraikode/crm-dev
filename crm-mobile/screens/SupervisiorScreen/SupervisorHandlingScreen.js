import React, { useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { View, Text } from 'dripsy';
import { Picker } from '@react-native-picker/picker';

import SiteTeamScreen from './SiteTeamScreen';
import LeaveApprovalScreen from './LeaveApprovalScreen';
import InstructionDetailScreen from './InstructionDetailScreen';

// 📱 Get screen height for 20% top spacing
const { height } = Dimensions.get('window');
const topSpacing = height * 0.04;

export default function SupervisorHandlingScreen() {
    const [selectedScreen, setSelectedScreen] = useState('site');

    const renderSelectedScreen = () => {
        switch (selectedScreen) {
            case 'site':
                return <SiteTeamScreen />;
            case 'leave':
                return <LeaveApprovalScreen />;
            case 'instruction':
                return <InstructionDetailScreen />;
            default:
                return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            {/* 20% top spacing */}
            <View sx={{ mt: topSpacing, alignItems: 'center', mb: 24 }}>
                <Text sx={{ fontSize: 24, fontWeight: 'bold', color: '#1E3A8A', textAlign: 'center' }}>
                    🛠 Supervisor Tools
                </Text>
                <Text sx={{ fontSize: 14, color: '#6B7280', mt: 1, textAlign: 'center' }}>
                    Manage site team, leaves & instructions
                </Text>
            </View>

            <View
                sx={{
                    mb: 20,
                    px: 3,
                }}
            >
                <Text
                    sx={{
                        fontSize: 16,
                        color: '#374151',
                        fontWeight: '500',
                        mb: 7,
                    }}
                >
                    🔽 Select a Section
                </Text>

                <View
                    sx={{
                        bg: 'white',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#CBD5E0', // light gray border
                        shadowColor: '#000',
                        shadowOpacity: 0.05,
                        shadowRadius: 4,
                        elevation: 3,
                        overflow: 'hidden',
                    }}
                >
                    <Picker
                        selectedValue={selectedScreen}
                        onValueChange={(value) => setSelectedScreen(value)}
                        style={{
                            height: 50,
                            paddingHorizontal: 10,
                            color: '#1F2937', // dark gray text
                            fontSize: 16,
                            backgroundColor: 'transparent',
                        }}
                        dropdownIconColor="#1E3A8A"
                    >
                        <Picker.Item label="👷 Site Team" value="site" />
                        <Picker.Item label="📄 Leave Approval" value="leave" />
                        <Picker.Item label="📝 Site Instructions" value="instruction" />
                    </Picker>
                </View>
            </View>

            {/* Dynamic screen rendering */}
            <View>{renderSelectedScreen()}</View>
        </ScrollView>
    );
}
