"use client";
import { NotFound } from '@/components';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';

const NotFoundPage = () => { return <NotFound/>; }

export default withTokenCleanup(NotFoundPage)