import React from 'react'
import HeaderFront from '../components/header/HeaderFront';
import MenuFront from '../components/menu/MenuFront';

interface ParentProps {
    children: React.ReactNode;
}

export default function FrontLayout(props : ParentProps) {
  return (
    <>
    <HeaderFront />
    <MenuFront />
    {props.children}
    </>
  )
}
