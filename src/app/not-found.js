"use client";
import { NotFound } from '@/components';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';
import "./globals.css";

const NotFoundPage = () => { return <div className="layer"><NotFound/></div> }

export default withTokenCleanup(NotFoundPage)