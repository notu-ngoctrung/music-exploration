import React, { useState } from 'react';
import AchievementCmd from './achievement';
import FunFactCmd from './fun-fact';
import HelpCmd from './help';
import PreviewCmd from './preview';
import SimilarityCmd from './similarity';
import SuggestMeCmd from './suggest-me';

/**
 * Component of "help"
 */
function HelpSection(props) {
  const listCmd = props.cmds.length > 0
    ? props.cmds 
    : ['suggest-me', 'preview', 'fun-fact', 'achievement', 'similarity', 'help'];

  // console.log('List ', listCmd);
  
  return (
    <>
      {listCmd.map(cmd => {
        switch (cmd) {
          case 'suggest-me':
            return <SuggestMeCmd />
          case 'preview':
            return <PreviewCmd />
          case 'fun-fact':
            return <FunFactCmd />
          case 'achievement':
            return <AchievementCmd />
          case 'similarity':
            return <SimilarityCmd />
          case 'help':
            return <HelpCmd />
        }
      })}
    </>
  )
}

export default HelpSection;